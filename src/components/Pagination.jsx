import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  color:var(--muted);
`;

const Btn = styled.button`
  background:transparent;
  border:1px solid rgba(255,255,255,0.04);
  padding:6px 8px;
  border-radius:6px;
  color:var(--text);
  cursor:pointer;
  &:disabled{opacity:0.4; cursor:default}
`;

export default function Pagination({ pager }) {
  const { page, totalPages, prev, next, goTo } = pager;
  return (
    <Wrap>
      <div>
        <Btn onClick={()=>goTo(1)} disabled={page===1}>First</Btn>{" "}
        <Btn onClick={prev} disabled={page===1}>Prev</Btn>
      </div>
      <div>Page {page} / {totalPages}</div>
      <div>
        <Btn onClick={next} disabled={page===totalPages}>Next</Btn>{" "}
        <Btn onClick={()=>goTo(totalPages)} disabled={page===totalPages}>Last</Btn>
      </div>
    </Wrap>
  );
}
