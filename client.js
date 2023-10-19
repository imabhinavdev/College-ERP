// fetchdata.js
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABSE_KEY);


module.exports = supabase;
