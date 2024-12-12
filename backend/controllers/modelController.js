const { NodeSSH } = require('node-ssh');
const fs = require('fs');
const ssh = new NodeSSH();

const executeModel = async (req, res) => {
  try {
    const privateKey = fs.readFileSync('/home/octaloop/.ssh/cricinsight-key.pem', 'utf8');

    await ssh.connect({
      host: '15.207.201.55',
      username: 'ubuntu',
      privateKey: privateKey,
      passphrase: '',

      debug: (message) => {
        console.log('SSH Debug:', message);
      }
    });

    const command = `
      cd CricInsight-Models &&
      source venv/bin/activate &&
      python3 cricket_video_analysis.py
    `;
    const result = await ssh.execCommand(command);

    console.log('STDOUT:', result.stdout);
    console.log('STDERR:', result.stderr);

    ssh.dispose();
    res.json({ message: 'Command executed successfully', output: result.stdout });
  } catch (error) {
    console.error('Detailed Error:', error);
    res.status(500).json({
      error: 'Failed to execute command',
      details: error.message,
    });
  }
};

module.exports = { executeModel };
