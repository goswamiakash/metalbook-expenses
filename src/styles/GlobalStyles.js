import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root{
    --bg:#0f1724;
    --panel:#111827;
    --muted:#9ca3af;
    --card:#0b1220;
    --accent:#ffd166;
    --accent-2:#ff7b7b;
    --text:#e6eef8;
    --glass: rgba(255,255,255,0.04);
  }
  *{box-sizing:border-box}
  body,html,#root{height:100%;margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;background: linear-gradient(180deg,#081226 0%, #0f1724 100%); color:var(--text);}
  input,button,select,textarea{font-family:inherit}
  a{color:inherit}
`;

export default GlobalStyles;
