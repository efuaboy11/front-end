export const routeDependencies = {
    "/admin/all-deposits/:id" : ["/admin/all-deposits", "/admin/successful-deposits", "/admin/pending-deposits", "/admin/declined-deposits", "/admin/user/:id", "/admin/all-deposits/:id"],
    "/admin/all-withdraws/:id" : ["/admin/all-withdraws", "/admin/successful-withdraws", "/admin/declined-withdraws", "/admin/pending-withdraws"],
    "/admin/all-investment/:1d" : ["/admin/all-investment", "/admin/active-investment", "/admin/compeleted-investment", "/admin/canceled-investment", "/admin/pending-investment"],
    "/admin/KYC/:id" : ["/admin/KYC/list", "/admin/KYC/verified", "/admin/KYC/rejected", "/admin/KYC/pending"],
    "/admin/investment-plan/:id": ["/admin/investment-plan/"],
    "/admin/payment-method/:id" : ["/admin/payment-method/", ],

    "/admin/change-password/step-2/" : ["/admin/change-password/step-1/"],
    "/admin/change-password/step-3/" : ["/admin/change-password/step-1/", "/admin/change-password/step-2/"]
    
} 