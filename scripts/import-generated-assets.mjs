import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const generatedAssetDirectory =
  process.env.GENERATED_ASSET_DIRECTORY ??
  '/Users/lukehaines/.cursor/projects/Users-lukehaines-Documents-Coding-DEEP/assets'

const projectRoot = process.cwd()
const originalDirectory = path.join(
  projectRoot,
  'fixtures',
  'assets',
  'originals',
)
const publicDirectory = path.join(projectRoot, 'public', 'demo', 'properties')

const artDirectionCandidates = [
  'cabin-rentals-tn-art-direction-morning',
  'cabin-rentals-tn-art-direction-mist',
  'cabin-rentals-tn-art-direction-autumn',
]

const selectedAssets = [
  'demo-laurel-glass-cabin',
  'demo-laurel-glass-living-room',
  'demo-laurel-glass-bedroom',
  'demo-laurel-glass-deck',
  'demo-laurel-glass-dusk',
  'demo-hemlock-house',
  'demo-blue-ridge-hearth',
  'demo-fern-hollow-retreat',
  'demo-riverbend-timber',
  'demo-copper-ridge-cabin',
  'demo-moss-and-moon-lodge',
  'demo-cedar-vale',
  'demo-little-pigeon-lookout',
  'demo-wears-valley-rest',
]

await mkdir(originalDirectory, { recursive: true })
await mkdir(publicDirectory, { recursive: true })

for (const assetName of [...artDirectionCandidates, ...selectedAssets]) {
  const source = path.join(generatedAssetDirectory, `${assetName}.png`)
  const original = path.join(originalDirectory, `${assetName}.png`)

  await copyFile(source, original)

  if (selectedAssets.includes(assetName)) {
    await sharp(source)
      .resize(1600, 900, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(publicDirectory, `${assetName}.webp`))
  }
}

console.log(
  `Imported ${artDirectionCandidates.length + selectedAssets.length} originals and produced ${selectedAssets.length} public derivatives.`,
)
