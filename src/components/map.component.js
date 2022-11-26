import React from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function RegretMap() {
  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  return(
    <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
      <YourComponent/>
    </Wrapper>
  );
}

export default React.memo(RegretMap)