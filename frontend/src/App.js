import "./App.css";
import RoutesCollection from "./RoutesCollection";
import { Container } from "@mui/system";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Container>
        <RoutesCollection />
      </Container>
    </>
  );
}

export default App;
