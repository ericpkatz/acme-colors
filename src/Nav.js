import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props)=> {
  const pathname = props.location.pathname;
  const { colorCount } = props;
  return (
    <nav>
      <Link to='/' className={ pathname === '/' ? 'selected': ''}>Home</Link>
      <Link to='/colors' className={ pathname === '/colors' ? 'selected': '' }>Colors ({ colorCount })</Link>
    </nav>
  );
};

const mapState = (state)=> {
  return {
    colorCount: state.colors.length
  };
};
export default connect(mapState)(Nav);
