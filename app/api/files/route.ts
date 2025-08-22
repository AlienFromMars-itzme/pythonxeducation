import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_OWNER = 'AlienFromMars-itzme'
const REPO_NAME = 'python-code-examples'

export async function GET(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 })
    }

    const octokit = new Octokit({
      auth: GITHUB_TOKEN,
    })

    // Get all files from examples directory
    const { data } = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: 'examples',
    })

    const files: any[] = []

    if (Array.isArray(data)) {
      for (const item of data) {
        if (item.type === 'dir') {
          // Get files from category directory
          const { data: categoryFiles } = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: item.path,
          })

          if (Array.isArray(categoryFiles)) {
            for (const file of categoryFiles) {
              if (file.name.endsWith('.py')) {
                // Get file content
                const { data: fileContent } = await octokit.repos.getContent({
                  owner: REPO_OWNER,
                  repo: REPO_NAME,
                  path: file.path,
                })

                // Get metadata if exists
                let metadata = {}
                try {
                  const metadataPath = file.path.replace('.py', '.json')
                  const { data: metadataContent } = await octokit.repos.getContent({
                    owner: REPO_OWNER,
                    repo: REPO_NAME,
                    path: metadataPath,
                  })
                  
                  if ('content' in metadataContent) {
                    metadata = JSON.parse(Buffer.from(metadataContent.content, 'base64').toString())
                  }
                } catch (e) {
                  // Metadata file doesn't exist, that's okay
                }

                if ('content' in fileContent) {
                  files.push({
                    id: file.sha,
                    name: file.name,
                    path: file.path,
                    category: item.name,
                    content: Buffer.from(fileContent.content, 'base64').toString(),
                    ...metadata
                  })
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json({ files })
  } catch (error: any) {
    console.error('Fetch files error:', error)
    return NextResponse.json({ files: [] })
  }
}