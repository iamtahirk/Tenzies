export default (props) => {
    // Dynamically set die background color based on whether the it is held or not
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : '#e7e7e7' 
    }
    return (
        <>
        {   props.value === 1 && 
            // Render first-face
            <div className="first-face" onClick={props.holdDice} style={styles}>
                <span className="pip"></span>
            </div>
        }

        { props.value === 2 && 
            // Render second-face
            <div className="second-face" onClick={props.holdDice} style={styles}>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        }

        {   props.value === 3 && 
            // Render third-face
            <div className="third-face" onClick={props.holdDice} style={styles}>
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
        }

        {   props.value === 4 && 
            // Render fourth-face
                <div className="fourth-face" onClick={props.holdDice} style={styles}>
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                    <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                    </div>
                </div>
        }

        {   props.value === 5 && 
            // Render fifth-face
            <div className="fifth-face" onClick={props.holdDice} style={styles}>
                <div className="column">
                    <span className="pip"></span>
                    <span className="pip"></span>
                </div>
                <div className="column">
                    <span className="pip"></span>
                </div>
                <div className="column">
                    <span className="pip"></span>
                    <span className="pip"></span>
                </div>
            </div>
        }

        {   props.value === 6 && 
            // Render sixth-face
            <div className="sixth-face" onClick={props.holdDice} style={styles}>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            <div className="column">
                <span className="pip"></span>
                <span className="pip"></span>
                <span className="pip"></span>
            </div>
            </div>
        }
        </>
    )
}
