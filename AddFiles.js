import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AddFiles.css";

const AddFiles = ({ users = [] }) => {
  const location = useLocation();
  const prefilledUser = location.state?.user || null;

  const [formData, setFormData] = useState({
    userEmail: "",
    department: "",
    fileType: "",
    description: "",
    fromDate: "",
    toDate: "",
    country: "",
    file: null,
  });
  const [category, setCategory] = useState("");

  const [files, setFiles] = useState({
    creditManagement: { creditRisk: [] },
    wealthCompliance: { aml: [], dormant: [], kyc: [] },
    wealthUserAdmin: { active: [], inactive: [] },
  });

  // Prefill from AdminFileManager
  useEffect(() => {
    if (prefilledUser) {
      setFormData((prev) => ({
        ...prev,
        userEmail: prefilledUser.email,
        department: prefilledUser.adGroup,
      }));
    }
  }, [prefilledUser]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleFileUpload = (file) => {
    const updated = { ...files };
    const fileName = file.name.toLowerCase();

    if (fileName.includes("credit")) {
      updated.creditManagement.creditRisk.push(file);
    } else if (fileName.includes("aml")) {
      updated.wealthCompliance.aml.push(file);
    } else if (fileName.includes("kyc")) {
      updated.wealthCompliance.kyc.push(file);
    } else if (fileName.includes("dormant")) {
      updated.wealthCompliance.dormant.push(file);
    } else if (fileName.includes("active")) {
      updated.wealthUserAdmin.active.push(file);
    } else if (fileName.includes("inactive")) {
      updated.wealthUserAdmin.inactive.push(file);
    }

    setFiles(updated);
  };

  const formatDuration = (from, to) => {
    if (!from || !to) return "";
    const f = new Date(from);
    const t = new Date(to);
    const fmt = (d) =>
      d.toLocaleString("en-US", { month: "short", year: "numeric" });
    if (f.getFullYear() === t.getFullYear() && f.getMonth() === t.getMonth()) {
      return fmt(f);
    }
    return `${fmt(f)} – ${fmt(t)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) return alert("Pick a file");
    if (!category) return alert("Pick a category (AML/KYC/DORMANT)");

    const userEmail = prefilledUser ? prefilledUser.email : formData.userEmail;
    const department = prefilledUser ? prefilledUser.adGroup : formData.department;

    const fd = new FormData();
    fd.append("category", category);
    fd.append("file", formData.file);
    fd.append("uploadedBy", userEmail);
    fd.append("department", department);
    fd.append("fileType", formData.fileType);
    fd.append("duration", formatDuration(formData.fromDate, formData.toDate));
    fd.append("country", formData.country);
    fd.append("description", formData.description);
    fd.append("status", prefilledUser ? prefilledUser.status : "");

    try {
      const res = await fetch("http://localhost:8080/api/reports/upload", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const t = await res.text();
        console.error(t);
        return alert("Upload failed: " + t);
      }

      const json = await res.json();
      console.log("Uploaded:", json);
      alert(
        `${json.message} (ID=${json.id}, File=${json.fileName}, Category=${json.category})`
      );

      handleFileUpload(formData.file);

      setFormData({
        userEmail: prefilledUser ? prefilledUser.email : "",
        department: prefilledUser ? prefilledUser.adGroup : "",
        fileType: "",
        description: "",
        fromDate: "",
        toDate: "",
        country: "",
        file: null,
      });
      setCategory("");
    } catch (err) {
      console.error(err);
      alert("Network/Server error");
    }
  };

  return (
    <div className="simple-container">
      <h2>Add File</h2>

      <form onSubmit={handleSubmit} className="basic-form">
        {/* Assign to User */}
        <div>
          <label>Assign to User</label>
          {prefilledUser ? (
            <input
              type="text"
              value={`${prefilledUser.name} (${prefilledUser.email})`}
              disabled
            />
          ) : (
            <select
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              required
            >
              <option value="">Select User</option>
              {users.map((u, i) => (
                <option key={i} value={u.email}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Department */}
        <div>
          <label>Department</label>
          {prefilledUser ? (
            <input type="text" value={prefilledUser.adGroup} disabled />
          ) : (
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Credit Management">Credit Management</option>
              <option value="Wealth Compliance">Wealth Compliance</option>
              <option value="Wealth User Admin">Wealth User Admin</option>
            </select>
          )}
        </div>

        {/* Status */}
        <div>
          <label>User Status</label>
          {prefilledUser ? (
            <input
              type="text"
              value={prefilledUser.status === "active" ? "Active" : "Inactive"}
              disabled
            />
          ) : (
            <p className="note">Select a user to see status</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="AML">AML</option>
            <option value="KYC">KYC</option>
            <option value="DORMANT">Dormant</option>
          </select>
        </div>

        {/* File Type */}
        <div>
          <label>File Type</label>
          <select
            name="fileType"
            value={formData.fileType}
            onChange={handleChange}
            required
          >
            <option value="">Select File Type</option>
            <option value="CSV">CSV</option>
            <option value="TXT">TXT</option>
            <option value="PDF">PDF</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description..."
          />
        </div>

        {/* Duration */}
        <div>
          <label>From Date</label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>To Date</label>
          <input
            type="date"
            name="toDate"
            value={formData.toDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Country */}
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </div>

        {/* Upload File */}
        <div>
          <label>Upload File</label>
          <input type="file" name="file" onChange={handleChange} required />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Sorted Files */}
      <h3>Sorted Files</h3>
      <div>
        <h4>Credit Management</h4>
        <p>Credit Risk</p>
        <ul>
          {files.creditManagement.creditRisk.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>Wealth Compliance</h4>
        <p>AML</p>
        <ul>
          {files.wealthCompliance.aml.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
        <p>Dormant</p>
        <ul>
          {files.wealthCompliance.dormant.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
        <p>KYC</p>
        <ul>
          {files.wealthCompliance.kyc.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddFiles;
