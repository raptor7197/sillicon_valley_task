# Reddit API Setup

To run the integration tests that use the Reddit API, you will need to create a Reddit application and provide your credentials in the `.env` file.

1. Go to https://www.reddit.com/prefs/apps
2. Click "are you a developer? create an app..."
3. Fill out the form:
   - name: svc-challenge
   - type: script
   - redirect uri: http://localhost:8080
4. Click "create app"
5. Copy the client ID and secret into your `.env` file.
