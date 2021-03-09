const { Product } = require('../models'); // To Get the model for Products
const { Formulas } = require('../models'); // To Get the model for Formulas
const { Guarantee } = require('../models'); // To Get the model for Guarantee 
const { Guarantee_Formulas } = require('../models'); // To Get the model for Guarantee_Formulas
const { Segment } = require('../models'); // To Get the model for Products
const { Product_Segment } = require('../models'); // To Get the model for Products


exports.ProductSegmentAssociation = () =>{

    Product.belongsToMany(Segment, {
        through: Product_Segment,
        foreignKey: 'product_id',
        otherKey: 'segment_id',
    });

    Segment.belongsToMany(Product, {
        through: Product_Segment,
        foreignKey: 'product_id',
        otherKey: 'segment_id',
    });

    Product_Segment.belongsTo(Product, {
        foreignKey: 'product_id',
        // as: 'Branch',
    });

    Product_Segment.belongsTo(Segment, {
        foreignKey: 'segment_id',
        // as: 'Filiales',
    });
}

exports.ProductFormulasAssociation = () => {
    // Association.formulasAssociation;
    Formulas.belongsTo(Product, {
        foreignKey: 'productId'
    });
    Product.hasMany(Formulas, {
        foreignKey: 'productId'
    });
}

exports.GuaranteeFormulasAssociation  = () => {
        //Relation of Association

        Guarantee.belongsToMany(Formulas, {
            through: Guarantee_Formulas,
            foreignKey: 'guarantee_id',
            otherKey: 'formulas_id',
        });
    
        Formulas.belongsToMany(Guarantee, {
            through: Guarantee_Formulas,
            foreignKey: 'guarantee_id',
            otherKey: 'formulas_id',
        });
    
        Guarantee_Formulas.belongsTo(Guarantee, {
            foreignKey: 'guarantee_id',
            // as: 'Branch',
        });
    
        Guarantee_Formulas.belongsTo(Formulas, {
            foreignKey: 'formulas_id',
            // as: 'Filiales',
        });
}