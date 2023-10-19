// fetchdata.js
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://wfujuyvevbanorbcibfe.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdWp1eXZldmJhbm9yYmNpYmZlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTgxNzc2NCwiZXhwIjoyMDA3MzkzNzY0fQ.n07wso6YeNvelHsPts4h-5gMeOUXy9ydDv4v3JoGanA');


module.exports = supabase;
