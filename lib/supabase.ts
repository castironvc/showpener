import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mslbbcfnynfrlwdpiqok.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQ5NzY1NSwiZXhwIjoxOTUyMDczNjU1fQ.FErZjPHI8gWJEc7guYj_MrhMD1uOuh1eMGlNUaCoDKQ"
);

export default supabase;
