
import NavBar from './NavBar';

const MainLayout = ({ children, path }) => {
  return (
    <div>
      {children}
      <NavBar showNav={true} path={path}/>
    </div>
  );
};

export default MainLayout;