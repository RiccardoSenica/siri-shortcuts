'use client';

import React from 'react';

export default function Home() {
  return (
    <>
      <div className='container'>
        <div className='header'>
          <h1>Siri Shortcuts v1.0.0</h1>
          <p>Anthropic-based power up for Siri Shortcuts</p>
        </div>

        <div className='terminal'>
          <div>Loading system components...</div>
          <div>Initializing shortcuts... OK</div>
          <div>Starting server... OK</div>
          <div>System ready_</div>
        </div>

        <div className='status'>
          <span>Status: OPERATIONAL</span>
          <span>Last Backup: 2024-01-18 14:30 UTC</span>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: #0a0a0a;
        }
      `}</style>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 2rem;
          background: #0a0a0a;
          color: #00ff00;
          font-family: monospace;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .terminal {
          background: #000;
          border: 1px solid #00ff00;
          padding: 1rem;
          margin: 2rem 0;
          max-width: 800px;
          margin: 2rem auto;
        }

        .terminal div {
          margin-bottom: 0.5rem;
        }

        .status {
          max-width: 800px;
          margin: 2rem auto;
          padding-top: 1rem;
          border-top: 1px solid #00ff00;
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .status {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
