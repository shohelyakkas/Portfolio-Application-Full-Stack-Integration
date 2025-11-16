#!/usr/bin/env node
/*
  Script: createAdmin.js
  Purpose: Create or update an admin user in MongoDB using the project's User model.
  Usage:
    # use defaults
    node scripts/createAdmin.js

    # or supply env vars
    ADMIN_EMAIL=admin@youremail.com ADMIN_PASSWORD=YourPass123! ADMIN_NAME=Admin node scripts/createAdmin.js
*/

import mongoose from 'mongoose'
import config from '../config/config.js'
import User from '../server/models/user.model.js'

const email = process.env.ADMIN_EMAIL || 'admin@example.com'
const password = process.env.ADMIN_PASSWORD || 'AdminPass123!'
const name = process.env.ADMIN_NAME || 'Admin'

async function run() {
    try {
        console.log('Connecting to DB...')
        await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })

        let user = await User.findOne({ email })
        if (user) {
            user.password = password // virtual sets salt/hashed_password
            user.role = 'admin'
            await user.save()
            console.log(`Updated existing user ${email} as admin.`)
        } else {
            user = new User({ name, email, password, role: 'admin' })
            await user.save()
            console.log(`Created admin user ${email}`)
        }

        await mongoose.disconnect()
        console.log('Done.')
        process.exit(0)
    } catch (err) {
        console.error('Error creating admin user:', err)
        try { await mongoose.disconnect() } catch (e) { }
        process.exit(1)
    }
}

run()
