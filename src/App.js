
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/drondin/olympus-graph',
  cache: new InMemoryCache()
});

function Dashboard() {

  const { loading, error, data } = useQuery(gql`
  query {
    protocolMetrics(first: 1) {
      ohmCirculatingSupply
      sOhmCirculatingSupply
      ohmPrice
      treasuryMarketValue
    }
  }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const metrics = data?.protocolMetrics[0]

  return <div style={{
    textAlign: "center"
  }}>
    <p>OHM Price: {Number(metrics.ohmPrice).toFixed(2)}</p>
    <p>OHM Circulating Supply: {Number(metrics.ohmCirculatingSupply).toFixed(2)}</p>
    <p>Treasury Market Value: {Number(metrics.treasuryMarketValue).toFixed(2)}</p>

  </div>
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <Dashboard />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
