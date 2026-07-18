const User = require("../models/User");

const checkCompanyApproval = async (req, res, next) => {

    try {

        const company = await User.findById(req.user.id);

        if (!company) {

            return res.status(404).json({

                success: false,

                message: "Company not found"

            });

        }

        if (company.role !== "company") {

            return res.status(403).json({

                success: false,

                message: "Only companies can perform this action"

            });

        }

        if (company.companyStatus !== "Approved") {

            return res.status(403).json({

                success: false,

                message: `Company is ${company.companyStatus}. Approval required before posting jobs.`

            });

        }

        next();

    } catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

module.exports = checkCompanyApproval;