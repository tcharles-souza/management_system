import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import context from './appContext';

function AppProvider({ children }) {
  const [user, setUserContext] = useState(null);

  const contexValue = useMemo(() => {
    return {
      user,
      setUserContext,
    };
  }, [user, setUserContext]);

  return (
    <context.Provider
      value={ contexValue }
    >
      {children}
    </context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
