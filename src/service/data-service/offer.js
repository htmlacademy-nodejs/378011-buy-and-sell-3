'use strict';

const Aliase = require(`../models/aliase`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
    this._User = sequelize.models.User;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async delete(id) {
    const deletedRows = await this._Offer.destroy({
      where: {id}
    });
    return !!deletedRows;
  }

  findOne(id, needComments) {
    const include = [Aliase.CATEGORIES,
      {
        model: this._User,
        as: Aliase.USER,
        attributes: {
          exclude: [`passwordHash`]
        }
      }
    ];
    if (needComments) {
      include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
        include: [
          {
            model: this._User,
            as: Aliase.USER,
            attributes: {
              exclude: [`passwordHash`]
            }
          }
        ]
      });
    }
    return this._Offer.findByPk(id, {include});
  }


  async findAll(needComments) {
    const include = [Aliase.CATEGORIES,
      {
        model: this._User,
        as: Aliase.USER,
        attributes: {
          exclude: [`passwordHash`]
        }
      }];
    if (needComments) {
      include.push({
        model: this._Comment,
        as: Aliase.COMMENTS,
        include: [
          {
            model: this._User,
            as: Aliase.USER,
            attributes: {
              exclude: [`passwordHash`]
            }
          }
        ]
      });
    }
    const offers = await this._Offer.findAll({include});
    return offers.map((item) => item.get());
  }

  async update(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: {id}
    });
    return !!affectedRows;
  }

  async findPage({limit, offset}) {
    const {count, rows} = await this._Offer.findAndCountAll({
      limit,
      offset,
      include: [Aliase.CATEGORIES, {
        model: this._User,
        as: Aliase.USER,
        attributes: {
          exclude: [`passwordHash`]
        }
      }],
      distinct: true
    });
    return {count, offers: rows};
  }

}

module.exports = OfferService;
