import execa from 'execa'
import { getGitInfo } from './git-info'

export default function (api) {
  api.addRequirement('create-nuxt-app', async () => {
    const { failed } = await execa('create-nuxt-app', [
      '--version'
    ], {
      cwd: api.options.baseFolder,
    })
    return !failed
  }, async () => {
    await execa('npm', [
      'i',
      '-g',
      'create-nuxt-app'
    ])
  })

  api.onGenerate(async () => {
    const gitInfo = getGitInfo()
    await execa('create-nuxt-app', [
      api.options.projectName,
      '--answers',
      JSON.stringify({
        name: api.options.projectName,
        description: 'My Nuxt app',
        author: gitInfo.name,
        pm: 'npm',
        ui: 'none',
        server: 'none',
        features: [],
        linter: [],
        test: 'none',
        mode: 'universal',
        devTools: [],
      })
    ], {
      cwd: api.options.baseFolder,
      stdio: ['inherit', 'inherit', 'inherit']
    })
  })
}
