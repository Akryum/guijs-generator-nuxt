import os from 'os'
import path from 'path'
import ini from 'ini'
import fs from 'fs'

export interface GitInfo {
  name: string
  username: string
  email: string
}

let gitInfo: GitInfo = null

export function getGitInfo (): GitInfo {
  if (gitInfo) return gitInfo

  const filepath = path.join(os.homedir(), '.gitconfig')
  if (!fs.existsSync(filepath)) {
    return { name: '', username: '', email: '' }
  }
  const { user = {} } = ini.parse(fs.readFileSync(filepath, { encoding: 'utf8' }))
  gitInfo = {
    name: user.name || '',
    username: user.username || '',
    email: user.email || ''
  }
  return gitInfo
}