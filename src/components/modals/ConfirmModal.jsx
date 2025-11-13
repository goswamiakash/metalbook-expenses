import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed; inset: 0;
  background: rgba(2,6,23,0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
`;

const Box = styled.div`
  background: var(--panel);
  padding: 18px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.04);
  width: 320px;
`;

const Buttons = styled.div`
  display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px;
`;

const Btn = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.danger ? "var(--accent-2)" : "var(--accent)")};
  color: #111827;
`;

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <Overlay>
      <Box>
        <div>{message}</div>
        <Buttons>
          <Btn onClick={onCancel}>Cancel</Btn>
          <Btn danger onClick={onConfirm}>Delete</Btn>
        </Buttons>
      </Box>
    </Overlay>
  );
}
