import { useReducer } from 'react';
import { CommonContext } from '../contexts/common.context';

export const commonStateDefault = {
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return authStateDefault;
  }
}

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, commonStateDefault);
  const { loading } = state;

  const exportData = {
    loading,
    dispatch,
  };

  return (
    <CommonContext.Provider value={exportData}>
      {children}
    </CommonContext.Provider>
  );
};

export default CommonProvider;
