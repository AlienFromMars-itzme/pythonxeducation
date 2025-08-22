import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'AlienFromMars-itzme'
const REPO_NAME = 'python-code-examples'

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'general'
    const description = formData.get('description') as string || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const content = await file.text()
    const fileName = file.name
    const filePath = `examples/${category}/${fileName}`

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })

    // Create or update file in repository
    const { data } = await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: filePath,
      message: `Add ${fileName} to ${category} category`,
      content: Buffer.from(content).toString('base64'),
    })

    // Also create/update metadata file
    const metadata = {
      fileName,
      category,
      description,
      uploadedAt: new Date().toISOString(),
      path: filePath
    }

    const metadataPath = `examples/${category}/${fileName.replace('.py', '.json')}`
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: metadataPath,
      message: `Add metadata for ${fileName}`,
      content: Buffer.from(JSON.stringify(metadata, null, 2)).toString('base64'),
    })

    return NextResponse.json({ success: true, path: filePath })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}