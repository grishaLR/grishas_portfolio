import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FplStats, Timer, Settings, MigraineApp } from '@pages';
import { App } from '@components';

export default (() => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/migraine-app" element={<MigraineApp />} />
    <Route path="/fpl-stats" element={<FplStats />} />
    <Route path="/timer" element={<Timer />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
)) as React.FC;
