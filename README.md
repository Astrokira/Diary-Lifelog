
# Diary App: "Diary·Lifelog"  

A lightweight and user-friendly diary **Wechat Mini program** designed for quick diary entry, historical timeline display, and data analysis of writing habits.

## Features
- **User Registration & Login**: Secure login with multi-user support and cloud storage for diary entries.
- **Quick Diary Creation**: Easily add new entries with automatic date and time recording.
- **Historical Timeline**: View and scroll through diary entries in a visually organized timeline.
- **Diary Editing & Deletion**: Edit and delete previous entries with a simple interface.
- **Data Analysis**: Track writing habits through statistics like total word count, average word count, and more.

## Key Innovations
- **Visualized Timeline**: A scrollable, categorized timeline of all entries for quick reference.
- **User Data Insights**: Analytics features that visualize writing activity and provide insights into user habits.
- **Multi-user Support**: Each user’s data is categorized and managed separately, supporting multiple users in one app.

## Project Structure

```
pages/
├── index/           # User login page
├── user/            # User welcome page
├── statistics/      # Diary statistics display page
├── newdiary/        # Add new diary entry page
├── history/         # Historical diary timeline page
├── detail/          # Detailed diary editing page
```

## Modules and Workflow

### 1. User Login  
- **Functionality**: Register and log in securely. User data is stored in the cloud database and can be accessed later for viewing or editing diaries.
  
### 2. User Welcome Page  
- **Functionality**: Displays the user’s avatar, username, and provides buttons for quick access to the main features (write new diary, view historical entries, stats).

### 3. New Diary Entry  
- **Functionality**: Add a new diary with a title and content. Automatically captures the date and time for the entry. Saved in the cloud for easy access.

### 4. Historical Timeline  
- **Functionality**: View all past diary entries organized by date. Scroll through entries and click to edit or view any entry in detail.

### 5. Diary Editing  
- **Functionality**: Edit existing diary entries. Users can modify the title and content of a diary and save changes back to the cloud.

### 6. Diary Statistics  
- **Functionality**: View statistics about writing activity, including the total word count, average word count, and the number of diary entries in the last week.

## Tools & Technologies
- **Frontend**: WeChat Mini Program, JavaScript, Wxss
- **Backend**: Cloud Database, Node.js
