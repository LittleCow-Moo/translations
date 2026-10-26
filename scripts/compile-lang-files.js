const fs = require("fs")
const path = require("path")

const languagePathnames = {
	"en.yml": "en_us",
	"ja.yml": "ja_jp",
	"ms.yml": "ms_my",
	"nan_Hntl_tailo.yml": "brb", // IGLanguages only accepts valid Java edition language IDs (?) so sorry Braobans
	"zh_Hans.yml": "zh_cn",
	"zh_Hant.yml": "zh_tw",
}

const components = ["lobby", "parkour"]

const rootDirectory = path.resolve(__dirname, "..")

for (const component of components) {
	const componentDirectory = path.join(rootDirectory, component)
	const languageFiles = fs
		.readdirSync(componentDirectory)
		.filter((filename) => filename.endsWith(".yml"))

	for (const languageFilename of languageFiles) {
		const altLanguageId = languagePathnames[languageFilename]
		if (!altLanguageId) {
			throw new Error(`Missing pathname mapping for ${languageFilename}`)
		}

		const sourcePath = path.join(componentDirectory, languageFilename)
		const destinationDirectory = path.join(
			rootDirectory,
			"dist",
			component,
			altLanguageId,
		)
		const destinationPath = path.join(destinationDirectory, languageFilename)

		fs.mkdirSync(destinationDirectory, { recursive: true })
		fs.copyFileSync(sourcePath, destinationPath)
	}
}
