import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  background: var(--panel);
  padding: 14px 18px;
  border-radius: 10px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
`;

const Title = styled.div`font-weight:700; color:var(--text); font-size:18px;`;
const Right = styled.div`color:var(--muted); font-size:13px;`;

export default function TopBar(){
  return (
    <Bar>
      <Title>Expense Tracker</Title>
      <Right>Dashboard</Right>
    </Bar>
  );
}
