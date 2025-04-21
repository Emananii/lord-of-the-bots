import { useEffect, useState } from 'react'
import Header from './Components/Header'
import TabView from './Components/TabView';
import BotCollection from './Components/BotCollection';
import YourBotArmy from './Components/YourBotArmy';
import CompareView from './Components/CompareView';
import BotSpecs from './Components/BotSpecs';
import './App.css'

function App() {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("collection"); // "collection" | "army" | "compare"
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [notification, setNotification] = useState(null);



  useEffect(() => {
    fetch("https://lord-of-the-bots-backend.onrender.com/bots")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBots(data);//we're saving what we get from the previous fetch to the bots state
        setLoading(false);//set to false after we get the data
      })
      .catch((err) => {
        console.error("Failed to fetch bots:", err);
        setError(err.message);
        setLoading(false);//setting it to false even if we encounter an error
      });
  }, []);//remember the empty array at the end of the useEffect to prevent infinite loop!!!!

   // Enlist bot function
   const enlistBot = (bot) => {
    if (!army.find(member => member.id === bot.id)) {
      setArmy([...army, bot]);
      showNotification(` A new oath has been sworn. ${bot.name} marches under your banner.`);
    } else {
      showNotification(`${bot.name} is already in your army!`);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
  
    // Clear the notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  //Remove bot from army
  const handleRemoveBot = (botId) => {
    setArmy(army.filter(bot => bot.id !== botId));
    showNotification(`You have honorably discharged this bot. May their circuits rest.`);
  };

  const clearSelectedBot = () => {
    setSelectedBot(null);
  };

  const handleDeleteBot = (botId) => {

    // Remove bot from both the bots and army states
    setBots(bots.filter((bot) => bot.id !== botId));
    setArmy(army.filter((bot) => bot.id !== botId));

    // Sending DELETE request to backend
    fetch(`https://lord-of-the-bots-backend.onrender.com/bots/${botId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting bot: ${response.status}`);
        }
        showNotification(`This bot has returned to the embrace of the gods. His courage shall forever be remembered`);
      })
      .catch((err) => {
        console.error("Failed to delete bot:", err);
        showNotification("Error deleting bot from database!");
      });
  };

  if (loading) return <p>Loading bots...</p>;
  if (error) return <p>Error loading bots: {error}</p>;

  return (
  <div className="App">
      <Header />

      {notification && ( <div className="notification"> {notification} </div> )}

       {/* If a bot is selected, show BotSpecs and return early */}
       {selectedBot ? (
        <BotSpecs bot={selectedBot} onBack={clearSelectedBot} onEnlist={enlistBot}
        fromArmy={view === "army"} onRemoveFromArmy={handleRemoveBot} 
        onDeleteBot={handleDeleteBot} />
      
      ) : (

      <>
      {/* Tab selector that controls the current view */}
      <TabView selectedView={view} setSelectedView={setView} />{/*The setSelectedView prop will allow
                                                                  tabview to access the setView function
                                                                  from App.jsx while the selectedView
                                                                  helps TabView to know which tab is currently
                                                                  active */}

      {/* Conditional rendering based on selected tab */}
      {view === "collection" && ( //if current tab is collection, render BotCollection
        <BotCollection bots={bots} onBotClick={setSelectedBot} />
      )}

      {view === "army" && (
        <YourBotArmy armyBots={army} onBotClick={setSelectedBot} RemoveBot={handleRemoveBot} />
      )}

      {view === "compare" && (
        <CompareView bots={bots} army={army} />
      )}
      </>
      )}
    </div>
  );
}

export default App;

