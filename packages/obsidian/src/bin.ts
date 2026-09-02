#!/usr/bin/env node
import { runDevServerCli } from '@vx-oss/docs-local-content/dev/ws/server';
import packageJson from '../package.json';

void runDevServerCli({ name: '@vx-oss/docs-obsidian', version: packageJson.version });
