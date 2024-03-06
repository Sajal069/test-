// This is the API end point 

import express from "express";
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js';
//import passport from "passport";
import  env  from "dotenv";

// server 

const app = express();
const port = 4000;
env.config();

// database 
const supabaseUrl = 'https://widcrloujwskdoubnaoi.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);




// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET route for login
app.get('/api/login', async(req, res) => {
  const { username, password } = req.query;

  // Check if both username and password are provided
  try {
    // Example: Retrieve data from a table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userid',username)
      .eq('password_hash',password);

    if (error) {
      return res.status(500).json({ error: 'Error fetching data from Supabase.Gve proper Username and Password' });
    }
    console.log(data);
    res.json({ data });
    // res.send("Express on Vercel");

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
