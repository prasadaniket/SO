'use client'

export default function FranchiseOwnerHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-4">Franchise Dashboard</h1>
      <p className="text-neutral-medium mb-8">
        Welcome to your outlet control panel. Here you can view performance metrics and reviews specifically for your location.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">My Customers</h3>
          <p className="text-3xl font-bold text-primary">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">My Reviews</h3>
          <p className="text-3xl font-bold text-primary">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">Outlet Rating</h3>
          <p className="text-3xl font-bold text-primary">-- / 5.0</p>
        </div>
      </div>

      {/* Implementation for franchise specific CMS components will go here */}
    </div>
  )
}
