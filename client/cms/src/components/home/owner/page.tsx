'use client'

export default function MainOwnerHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-secondary mb-4">Main Owner Dashboard</h1>
      <p className="text-neutral-medium mb-8">
        Welcome to the master control panel. From here you can view statistics across all outlets, manage the universal menu, and export complete customer data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">Total Customers</h3>
          <p className="text-3xl font-bold text-primary">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">Total Reviews</h3>
          <p className="text-3xl font-bold text-primary">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-light">
          <h3 className="font-semibold text-secondary mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-primary">-- / 5.0</p>
        </div>
      </div>
      
      {/* Implementation for all CMS components will go here */}
    </div>
  )
}
