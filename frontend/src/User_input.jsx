

function Userinput(){
    return(
        <div className="user-input-container">
            <h1>Please enter your Name</h1>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" />
            <p><strong>Note:</strong> Please enter a valid name and dont spam.</p>
        </div>
    )
}
export default Userinput;