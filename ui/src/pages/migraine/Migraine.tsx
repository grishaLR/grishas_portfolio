import React from 'react';
import { Brain } from '@components';
import { AddMigraine } from './components/AddMigraine';
import AddMigraineTypeInput from './components/AddMigraineTypeInput/AddMigraineTypeInput';
import { MigraineTypeList } from './components/MigraineTypeList';
import { MigraineList } from './components/MigraineList';

import './styles.css';

export default (() => {
  return (
    <div className="migraine-content">
      <h1>Migraine App</h1>
      <div className="brain-container">
        <div className="brain">
          <Brain />
        </div>
        <div className="add-migraine-form">
          <AddMigraine />
        </div>
        <div className="migraine-type-form">
          <div>
            <AddMigraineTypeInput />
          </div>
          <div>
            <MigraineTypeList />
          </div>
        </div>
      </div>
      <div>
        <MigraineList />
      </div>
    </div>
  );
}) as React.FC;
