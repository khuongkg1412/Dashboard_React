class User {
    constructor(Name, Createdate, SignIn, Level, Stage, Status, Id) {
        this.Name = Name;
        this.Createdate = Createdate;
        this.SignIn = SignIn;
        this.Level = Level;
        this.Stage = Stage;
        this.Status = Status;
        this.Id = Id;
    }
}

module.exports = User;