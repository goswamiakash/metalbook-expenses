import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  background: var(--panel);
  padding: 14px 18px;
  border-radius: 10px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
`;

const Title = styled.div`font-weight:700; color:var(--text); font-size:18px;`;

export default function TopBar(){
  return (
    <Bar>
      <Title>Expense Tracker</Title>
    </Bar>
  );
}
