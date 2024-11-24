import HospitalPageBaseComponent from "./HospitalPageBaseComponent";

const HospitalPageContent = () => {
  return (
    <div>
      {/* Thank You Section */}
      <HospitalPageBaseComponent
        header="Thank you for your donation!"
        paragraph={`Our mission and how your donation will help us: 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        styles={{
          container: { backgroundColor: "#f9f9f9", padding: "6rem" },
          header: {
            color: "#333",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          },
          paragraph: { color: "#666" },
        }}
      />

      {/* Impact Section */}
      <HospitalPageBaseComponent
        image="https://via.placeholder.com/400"
        header="The Impact of Your Donation"
        paragraph={`This is the positive impact made possible with your donations!
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        styles={{
          container: { backgroundColor: "#039BDC", padding: "5rem" },
          imageContainer: {},
          header: { color: "#fff", textAlign: "center", fontSize: "2rem" },
          paragraph: { color: "#fff" },
        }}
      />

      {/* About Our Health Organization Section */}
      <HospitalPageBaseComponent
        header="About Our Health Organization"
        paragraph={`Our mission at the organization: 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        styles={{
          container: { backgroundColor: "#f9f9f9", padding: "5rem" },
          header: {
            color: "#000",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          },
          paragraph: { color: "#777", textAlign: "left" },
        }}
      />
    </div>
  );
};

export default HospitalPageContent;
