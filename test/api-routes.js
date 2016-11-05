const express = require('express');

const router = new express.Router();

router.get('/SearchDestinyPlayer/:platform/:gamertag', (req, res) => {
  const platform = req.params.platform;
  const gamertag = req.params.gamertag;
  if (platform === '2' && gamertag === 'abbott567') {
    res.json({
      Response: [
        {
          iconPath: '/img/theme/destiny/icons/icon_psn.png',
          membershipType: 2,
          membershipId: '4611686018428682003',
          displayName: 'abbott567'
        }
      ],
      ErrorCode: 1,
      ThrottleSeconds: 0,
      ErrorStatus: 'Success',
      Message: 'Ok',
      MessageData: { }
    });
  } else {
    res.json(false);
  }
});

router.get('/:platform/Account/:bungieId/Summary/', (req, res) => {
  const platform = req.params.platform;
  const bungieId = req.params.bungieId;
  if (platform === '2' && bungieId === '4611686018428682003') {
    res.json({
      Response: {
        data: {
          membershipId: '4611686018428682003',
          membershipType: 2,
          characters: [
            {
              characterBase: {
                characterId: '2305843009252291000',
                powerLevel: 390,
                classType: 2,
                grimoireScore: 4485
              },
              emblemPath: '/common/destiny_content/icons/4ddc836fe272a8c377635fa6cfa1d7a9.jpg',
              backgroundPath: '/common/destiny_content/icons/580b6d043f3f977531477a690a2771d9.jpg',
              emblemHash: 185564349,
              characterLevel: 40,
              baseCharacterLevel: 40,
              isPrestigeLevel: false,
              percentToNextLevel: 0
            }
          ]
        }
      },
      ErrorCode: 1,
      ThrottleSeconds: 0,
      ErrorStatus: 'Success',
      Message: 'Ok',
      MessageData: {}
    });
  } else {
    res.json(false);
  }
});

router.get('/Stats/ActivityHistory/:platform/:bungieId/:characterId', (req, res) => {
  const platform = req.params.platform;
  const bungieId = req.params.bungieId;
  const characterId = req.params.characterId;

  if (platform === '2' && bungieId === '4611686018428682003' && characterId === '2305843009252291000') {
    res.json({
      Response: {
        data: {
          activities: [
            {
              activityDetails: {
                referenceId: 260765522
              },
              values: {
                completed: {
                  statId: 'completed',
                  basic: {
                    value: 1,
                    displayValue: 'Yes'
                  }
                }
              }
            },
            {
              activityDetails: {
                referenceId: 2659248071
              },
              values: {
                completed: {
                  statId: 'completed',
                  basic: {
                    value: 0,
                    displayValue: 'No'
                  }
                }
              }
            }
          ]
        }
      },
      ErrorCode: 1,
      ThrottleSeconds: 0,
      ErrorStatus: 'Success',
      Message: 'Ok',
      MessageData: { }
    });
  } else {
    res.json(false);
  }
});

module.exports = router;
