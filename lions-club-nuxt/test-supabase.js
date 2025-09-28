// Simple test to verify Supabase connection
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

console.log('Testing Supabase connection...')
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration')
  process.exit(1)
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Test connection
async function testConnection() {
  try {
    // Query the actual 'test' table you created
    const { data, error } = await supabase
      .from('test')
      .select('*')
      .limit(5)

    if (error) {
      if (error.message.includes('relation "test_table" does not exist')) {
        console.log('✅ Supabase connection successful!')
        console.log('✅ Authentication working (received proper error about missing table)')
        console.log('📋 You can now use Supabase in your Nuxt application')
      } else if (error.message.includes('permission denied')) {
        console.log('✅ Supabase connection successful!')
        console.log('⚠️  Permission denied - check your Row Level Security policies')
      } else {
        console.log('❌ Supabase error:', error.message)
      }
    } else {
      console.log('✅ Supabase connection successful!')
      console.log('✅ Data retrieved:', data)
    }
  } catch (err) {
    console.error('❌ Connection failed:', err.message)
  }
}

testConnection()