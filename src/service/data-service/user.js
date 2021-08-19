'use strict';

class UserService {
  constructor(sequelize) {
    this._User = sequelize.models.User;
  }

  async create(userData) {
    const user = await this._User.create(userData);
    return user.get();
  }


  findByEmail(email) {
    const user = this._User.findOne({
      where: {email}
    });
    return user;
  }


}

module.exports = UserService;
