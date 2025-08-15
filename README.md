![VENDITHERA LOGO](https://github.com/user-attachments/assets/11c451df-7877-46e7-90e1-5bddbdc59630)
</br>

> Vendithera was the second event organized by my college's film-making club, **Chitrakala**, on **June 29, 2024**.  
> We recreated a theatre-like experience on campus by screening two cult classics — **Pokiri** and **Jalsa** — and built a dynamic, theatre-style **seat booking interface** so students could pick their favorite seats.

---

## ✨ Highlights

- 🎟️ **Theatre-style seat map** with rows A–AB, realistic gaps, offsets, and aisle spacing  
- 👥 **Seat types**: Boys / Girls sections via CSS image rules  
- 🟩 **Selection flow**: click to select, **BOOK** to confirm  
- 💾 **Local persistence** using `localStorage` — bookings **survive page refresh** on the same device/browser  
- 🔄 Safety unbook: clicking a **booked** seat 4 times unbooks it (handy for testing)  
- 📣 **Live popups** showing selected seats & confirmation toast

> ⚠️ Note: LocalStorage is **per-device/per-browser**. If you need multi-user shared bookings, add a backend (e.g., Spring Boot + MySQL or Firebase).

---

## 🧩 Tech Stack

- **Design:** Figma (wireframes, gradients, components, auto-layout)  
- **Frontend:** HTML, CSS, Vanilla JS  
- **Persistence (local):** `window.localStorage`

---

## 🖼️ Screens & Design


</br>

![image](https://github.com/user-attachments/assets/a97e0a49-094d-47eb-be1d-9a26ace1431f)

---

## 📁 Project Structure

```
.
├── index.html
├── styles.css
├── script.js
└── images/
    ├── avaboy.png
    ├── avagirl.png
    ├── selected.png
    ├── booked.png
    ├── test_pic1709289331697.jpg
    ├── 1369153-t-baa9a1b01439.webp
    └── (your logos/screenshots here)
```

> Fonts are loaded from `/fonts` if you include them; update paths in `styles.css` as needed.

---

## 🚀 Quick Start

**Option 1: Open directly**
1. Clone or download the repo.
2. Double-click `index.html` to open in your browser.

**Option 2: Local dev server (recommended)**
- VS Code → install **Live Server** extension → Right-click `index.html` → **Open with Live Server**.  
  This avoids any path/CORS issues and auto-reloads on save.

---

## 💾 LocalStorage Persistence (How It Works)

- When you click **BOOK**, the selected seats are stored into:
  ```js
  localStorage.setItem('bookedSeats', JSON.stringify([...seatNumbers]))
  ```
- On page load, the app reads the stored list and reapplies the `.booked` CSS class to those seats.
- A booked seat can be “unbooked” for testing by clicking it **four times** (this also updates LocalStorage).

**Reset everything quickly**
- Open DevTools → **Application** tab → **Local Storage** → clear key `bookedSeats`.
- Or run in console:
  ```js
  localStorage.removeItem('bookedSeats');
  location.reload();
  ```

---

## ⚙️ Configuration & Customization

- **Event metadata** (auditorium name, date, time) is set in `index.html`.  
- **Seat images & sections** are controlled with CSS attribute selectors in `styles.css`:
  ```css
  [data-seat="B15"], [data-seat="B16"], ... { background-image: url('images/avagirl.png'); }
  ```
  Adjust these ranges to change seat-type sections.
- **Seat map layout** (rows, counts, aisles) is generated in `script.js` inside `generateSeatMap()` by the `rows` array and `seatsPerRow` mapping.  
  You can edit:
  ```js
  const rows = ['A','B',...,'AA','AB'];
  const seatsPerRow = [32, 28, ... , 26, 22];
  ```

---

## 🧪 Development Notes

- The **BOOK** button shows the number of currently selected seats before confirming.  
- A floating **“Seats selected: …”** popup updates in real time.  
- After booking, a toast appears: **“Thanks for booking!”**

---

## 🔮 Future Enhancements

- Backend (Spring Boot + MySQL) for **multi-user** persistence
- Authenticated booking with **name/roll number**
- **Row/seat pricing** and cart summary
- **Admin panel** to block/unblock seats & download reports
- **Accessibility**: ARIA roles, keyboard focus management
- **Responsive** layout tweaks for mobile screens

---

## 📜 License

This project is for educational and event use. You may adapt it for your campus events. 

---

## 🙌 Acknowledgments

- **Chitrakala** film-making club, organizing team, and volunteers  
- Everyone who attended **Vendithera** and made it a memorable event!

---

## 👤 Author / Tech Lead

- **Samrat Dudgundi** — Lead developer & designer for the Vendithera booking interface

