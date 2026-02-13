// Definisikan nama file di paling atas agar bisa diakses semua fungsi
const FILE_NAME = "notes.txt";
const newNote = "This is a new note.happy coding!\n";

//1 fungsi untuk menulis catatan ke dalam file
async function addNote(content: string) {
  try {
    const file = Bun.file(FILE_NAME);

    // Ambil isi lama jika ada
    const existingContent = (await file.exists()) ? await file.text() : "";

    // Tambahkan catatan baru (dengan timestamp agar lebih keren)
    const timestamp = new Date().toLocaleString();
    const formattedNote = `[${timestamp}] ${content}\n`;

    // Simpan kembali
    await Bun.write(FILE_NAME, existingContent + formattedNote);

    console.log("✅ Catatan berhasil disimpan!");
  } catch (error) {
    console.error("❌ Gagal menyimpan catatan:", error);
  }
}

// 2. Fungsi untuk membaca semua catatan
async function readNotes() {
  const file = Bun.file(FILE_NAME);
  if (await file.exists()) {
    const content = await file.text();
    console.log("\n--- DAFTAR CATATAN ---");
    // Menampilkan nomor baris agar mudah untuk dihapus nanti
    const lines = content.trim().split("\n");
    lines.forEach((line, index) => {
      console.log(`${index + 1}. ${line}`);
    });
  } else {
    console.log("\n📭 Belum ada catatan tersimpan.");
  }
}

// 3. Fungsi untuk memperbaharui catatan berdasarkan nomor baris
async function updateNote(number: number, newContent: string) {
  const file = Bun.file(FILE_NAME);

  if (!(await file.exists())) {
    console.log("Tidak ada catatan");
    return;
  }

  const content = await file.text();
  const lines = content.trim().split("\n").filter(Boolean);

  if (number < 1 || number > lines.length) {
    console.log("X Nomor catatan tidak valid");
    return;
  }

  const timestamp = new Date().toISOString();
  lines[number - 1] = `[${timestamp}] ${newContent}`;

  await Bun.write(FILE_NAME, lines.join("\n") + "\n");
  console.log("Catatan berhasil di perbaharui");
}

// 4. Fungsi untuk menghapus catatan berdasarkan nomor baris
async function deleteNote(lineNumber: number) {
  try {
    const file = Bun.file(FILE_NAME);
    if (!(await file.exists())) return;

    const content = await file.text();
    const lines = content.trim().split("\n");

    if (lineNumber > 0 && lineNumber <= lines.length) {
      const removed = lines.splice(lineNumber - 1, 1);
      // Simpan kembali sisa barisnya, jangan lupa tambahkan newline di akhir
      await Bun.write(FILE_NAME, lines.join("\n") + (lines.length > 0 ? "\n" : ""));
      console.log(`🗑️ Berhasil menghapus: ${removed}`);
    } else {
      console.log("❌ Nomor catatan tidak valid!");
    }
  } catch (error) {
    console.error("❌ Gagal menghapus catatan:", error);
  }
}

// Ambil input dari terminal: bun run index.ts "isi catatan"
const command = Bun.argv[2];
const value = Bun.argv[3];
const extra = Bun.argv[4];

// TAMBAHKAN BAGIAN INI:
if (command === "list" || command === "view") {
  await readNotes();
} else if (command === "delete") {
  if (value) {
    const indexToDelete = parseInt(value);
    if (!isNaN(indexToDelete)) {
      await deleteNote(indexToDelete);
    } else {
      console.log("❌ Error: Harap masukkan angka.");
    }
  } else {
    console.log("⚠️ Masukkan nomor baris. Contoh: bun run index.ts delete 1");
  }
} else if (command === "update") {
  if (!value || !extra) {
    console.log(`Yang benar adalah bun run index.ts update 2 "text baru"`);
  } else {
    const num = parseInt(value);
    if (isNaN(num)) {
      console.log("Nomor harus berupa angka");
    } else {
      await updateNote(num, extra);
      await readNotes();
    }
  }
} else if (command) {
  await addNote(command);
  await readNotes();
} else {
  console.log("💡 Tips:");
  console.log("   Lihat Semua : bun run index.ts list");
  console.log('   Tambah      : bun run index.ts "isi catatan"');
  console.log(`   Edit : bun run index.ts update[nomor] "isi baru"`);
  console.log("   Hapus       : bun run index.ts delete [nomor]");
}
