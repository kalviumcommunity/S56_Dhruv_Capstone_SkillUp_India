// Breadcrumbs.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import "./Breadcrumbs.css";

function BreadcrumbItem({ to, text, icon }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {icon && React.cloneElement(icon, { style: { marginRight: 4 } })}
      {text}
    </Link>
  );
}

function BreadcrumbSeparator() {
  return <Typography>/</Typography>;
}

const AppBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs className='breadcrumbs' aria-label="breadcrumb" separator={<BreadcrumbSeparator />}>
      <BreadcrumbItem to="/" text="" icon={<HomeIcon   fontSize="20px" />} />
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <BreadcrumbItem key={name} to={routeTo} text={name} />
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
