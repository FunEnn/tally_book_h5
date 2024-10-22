
import NavBar from './NavBar';

const MainLayout = ({ children }) => {
  return (
    <div>
      {children}
      <NavBar showNav={true}/>
    </div>
  );
};

export default MainLayout;