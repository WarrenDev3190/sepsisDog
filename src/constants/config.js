import yaml_config from 'node-yaml-config'
import path from 'path'

const config = yaml_config.load(path.resolve(__dirname,'../../config.yaml'))

module.exports = config