const { decode, parse } = require('./response')

describe('Protocol > Requests > Fetch > v5', () => {
  const batchContext = {
    firstOffset: expect.any(String),
    firstSequence: expect.any(Number),
    firstTimestamp: expect.any(String),
    inTransaction: expect.any(Boolean),
    isControlBatch: expect.any(Boolean),
    lastOffsetDelta: expect.any(Number),
    magicByte: expect.any(Number),
    maxTimestamp: expect.any(String),
    partitionLeaderEpoch: expect.any(Number),
    producerEpoch: expect.any(Number),
    producerId: expect.any(String),
  }

  test('response', async () => {
    const data = await decode(Buffer.from(require('../fixtures/v5_response.json')))
    expect(data).toEqual({
      throttleTime: 0,
      responses: [
        {
          topicName: 'test-topic-c935d678835de2c9c79e-2064-677041b7-df54-4d4d-a53a-b9133d2fdc8c',
          partitions: [
            {
              partition: 0,
              errorCode: 0,
              highWatermark: '3',
              abortedTransactions: [],
              lastStableOffset: '3',
              lastStartOffset: '0',
              messages: [
                {
                  offset: '0',
                  magicByte: 2,
                  attributes: 0,
                  batchContext,
                  timestamp: '1509827900073',
                  headers: { 'header-key-0': Buffer.from('header-value-0') },
                  key: Buffer.from('key-0'),
                  value: Buffer.from('some-value-0'),
                  isControlRecord: false,
                },
                {
                  offset: '1',
                  magicByte: 2,
                  attributes: 0,
                  batchContext,
                  timestamp: '1509827900073',
                  headers: { 'header-key-1': Buffer.from('header-value-1') },
                  key: Buffer.from('key-1'),
                  value: Buffer.from('some-value-1'),
                  isControlRecord: false,
                },
                {
                  offset: '2',
                  magicByte: 2,
                  attributes: 0,
                  batchContext,
                  timestamp: '1509827900073',
                  headers: { 'header-key-2': Buffer.from('header-value-2') },
                  key: Buffer.from('key-2'),
                  value: Buffer.from('some-value-2'),
                  isControlRecord: false,
                },
              ],
            },
          ],
        },
      ],
    })

    await expect(parse(data)).resolves.toBeTruthy()
  })
})
