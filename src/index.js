import React from 'react';
import ReactDOM from 'react-dom';
import IconSettings from '@salesforce/design-system-react/components/icon-settings';
import { RepositoryList } from './componentes/RepositoryList'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <IconSettings iconPath="/assets/icons">
        <RepositoryList />

  </IconSettings>,
  document.getElementById('root')
);
