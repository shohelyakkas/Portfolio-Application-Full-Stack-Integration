#!/usr/bin/env node

/*
  Script: setProjectLinks.js
  Purpose: Set `projectUrl` field for existing Project documents by title.
  Usage:
    node scripts/setProjectLinks.js
*/

import mongoose from 'mongoose'
import config from '../config/config.js'
import Project from '../server/models/project.model.js'

const mapping = {
    'Business Website': 'http://studentweb.cencol.ca/sakkas/Final_Project/index.html',
    'E-Commerce App': 'http://studentweb.cencol.ca/sakkas/Assignment_3/Assignment_3.html',
    'Pokédex Application': 'https://shohelyakkas.github.io/Academic-Projects_Pok-dex-application/',
    'Pixer Movie Gallery': 'https://shohelyakkas.github.io/Academic-Projects_Pixer-Movie-Gallery/'
}

async function run() {
    try {
        console.log('Connecting to DB...')
        await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

        for (const [title, url] of Object.entries(mapping)) {
            const doc = await Project.findOne({ title })
            if (!doc) {
                console.warn(`Project with title "${title}" not found. Skipping.`)
                continue
            }
            doc.projectUrl = url
            await doc.save()
            console.log(`Updated project "${title}" -> ${url}`)
        }

        await mongoose.disconnect()
        console.log('Done.')
        process.exit(0)
    } catch (err) {
        console.error('Error updating project links:', err)
        try { await mongoose.disconnect() } catch (e) { }
        process.exit(1)
    }
}

run()
