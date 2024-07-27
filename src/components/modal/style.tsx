export class CustomModalStyle {
  constructor(properties = {}) {
    const defaults = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxHeight: "90%",
      minHeight: "40%",
      maxWidth: 1500,
      bgcolor: "#fff",
      borderRadius: "5px",
      boxShadow: 2,
      pb: 4,
      paddingX: "5rem",
      overflowY: "auto",
      overflowX: "hidden",
    };

    Object.assign(this, defaults, properties);
  }
}
